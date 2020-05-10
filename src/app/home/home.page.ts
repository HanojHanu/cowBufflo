import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('b', { static: false }) bElement: IonInput;

  // one:any;
  // two:any;
  // tree:any;
  // four:any;

  wordForm: FormGroup;
  userForm: FormGroup;

  data: any = [];

  submitted = false;

  hardCode: any;

  pattern: any;
  inputChar: any;
  inputElements: any = [];

  constructor(private formBuilder: FormBuilder, public toastController: ToastController) { }


  ngOnInit() {
    this.wordForm = this.formBuilder.group({
      firstLetter: ['', Validators.required],
      secondLetter: ['', Validators.required],
      thirdLetter: ['', Validators.required],
      fourLetter: ['', [Validators.required]],
    });

    this.userForm = this.formBuilder.group({
      one: ['', Validators.required],
      two: ['', Validators.required],
      three: ['', Validators.required],
      four: ['', [Validators.required]],
    });

    if (this.hardCode === undefined) {
      //this.autoNumber();
      this.hardCode = this.random4Digit();
      console.log('this.hardCode :', this.hardCode);
    }

  }

  // convenience getter for easy access to form fields
  //get f() { return this.wordForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('wordForm :', this.wordForm);
    // stop here if form is invalid
    if (this.wordForm.value.firstLetter && this.wordForm.value.secondLetter &&
      this.wordForm.value.thirdLetter && this.wordForm.value.fourLetter) {
      // display form values on success
      this.mainlogic(this.wordForm.value);
      this.inputElements = [];
    }
    else {
      this.presentToast();
      console.log('this.wordForm.invalid :', this.wordForm.invalid);
      return;
    }

  }

  loginForm() {
    console.log('this.userForm :', this.userForm);
  }



  mainlogic(letters) {
    console.log('letters :', letters);
    var cow = 0;
    var bufflo = 0;
    var buffloIndex: any = [];
    var cowIndex: any = [];
    //console.log('Object.keys(letters).length :', Object.keys(letters).length);
    //console.log('Object.keys(letters) :', Object.values(letters));

    var arrletters = Object.values(letters);
    var lettersLength = Object.keys(letters).length;
    this.hardCode = this.hardCode.toString();
    var arrHardCode = this.hardCode.split('');
    var hardCodeLength = arrHardCode.length;

    for (let i = 0; i < arrHardCode.length; i++) {
      const systemValue = arrHardCode[i];

      for (let j = 0; j < arrletters.length; j++) {
        const letterValue = arrletters[j];
      
        /** bufflo */
        if(systemValue === letterValue && i === j ){
          bufflo = bufflo + 1;
          buffloIndex.push(i);
        }
       
      }
    }


    for (let i = 0; i < arrletters.length; i++) {
      const userValue = arrletters[i];
        /** cow */
        if(!buffloIndex.includes(i)){
          if(arrHardCode.includes(userValue)){
            cow = cow + 1;
            cowIndex.push(i);
          }
        }
    }

    this.wordForm.reset();
    //console.log('arrletters :', arrletters, 'cow :', cow, 'bufflo :', bufflo);
    //console.log('***************************************************');
    this.data.push({ word: arrletters.toString(), cow: cow, bufflo: bufflo });
    if (bufflo === 4) {
      this.gameover();
      //this.autoNumber();
      this.hardCode = this.random4Digit();
      console.log('this.hardCode :', this.hardCode);
    }

  }

  onReset() {
    this.submitted = false;
    this.wordForm.reset();
  }


  gameover() {
    this.gameOverToast();
    this.data = [];
    this.wordForm.reset();
  }

  numberOnlyValidation(event: any, nextElement ) {
    this.pattern = /[0-9.,]/;
    this.inputChar = String.fromCharCode(event.charCode);
    
    if (!this.pattern.test(this.inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
    else if (this.inputElements.includes(this.inputChar)){
      console.log('this.inputElements.includes(this.inputChar) :>> ', this.inputElements.includes(this.inputChar));
      this.dulicateNum();
      //event.preventDefault();
    }
    else  if (this.pattern.test(this.inputChar)) {
      this.inputElements.push(this.inputChar);
      //jumping
      nextElement.setFocus();
    }
  }

  moveFocus(nextElement) {
    //console.log('this.inputChar :>> ', this.inputChar);
    //console.log('this.pattern.test(this.inputChar) :>> ', this.pattern.test(this.inputChar));
    if (this.pattern.test(this.inputChar)) {
      //jumping
      //nextElement.setFocus();
    }
  }



  async presentToast() {
    const toast = await this.toastController.create({
      message: ' please enter a 4 digit valid input',
      color: 'secondary',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }


  async dulicateNum() {
    const toast = await this.toastController.create({
      message: `${this.inputChar} already enterd. try diff value`,
      color: 'warning',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  async gameOverToast() {
    const toast = await this.toastController.create({
      message: ' Good Game!..... ',
      color: 'success',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }


  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'middle',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  autoNumber() {
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log('val : ', val);

    this.hardCode = val;
  }

  random4Digit(){
    return this.shuffle( "0123456789".split('') ).join('').substring(0,4);
  }
  
  shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

}
