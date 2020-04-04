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
      this.autoNumber();
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
        if (systemValue === letterValue && i === j) {
          bufflo = bufflo + 1;
          buffloIndex.push(systemValue);
        }
        /** cow */
        if (!buffloIndex.includes(letterValue) && !cowIndex.includes(j)) {
          if (systemValue === letterValue) {
            cow = cow + 1;
            cowIndex.push(j);
          }
        }

      }
    }

    this.wordForm.reset();
    console.log('arrletters :', arrletters);
    console.log('cow :', cow);
    console.log('bufflo :', bufflo);
    console.log('***************************************************');
    this.data.push({ word: arrletters.toString(), cow: cow, bufflo: bufflo });
    if (bufflo === 4) {
      this.gameover();
      this.autoNumber();
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

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  moveFocus(nextElement) {
    //console.log('KeyUp...');
    nextElement.setFocus();
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
      position: 'top',
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

}
