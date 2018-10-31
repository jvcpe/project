import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { AlertService, TopicService } from '../../_services';
import { User } from '../../_models';

@Component({
  templateUrl: './profil.component.html'
})
export class ProfilComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private TopicService: TopicService,
    private sanitization: DomSanitizer,
    private cd: ChangeDetectorRef,
  ){
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  user: User;
  modification: boolean = false;
  modificationForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string;
  loading: boolean;
  image: SafeUrl;
  selectedFile: File;

  ngOnInit(){
    console.log(this.user);
    this.image = this.sanitization.bypassSecurityTrustUrl('data:image/svg;base64,' + this.user.img);
    this.modificationForm = this.formBuilder.group({
        modificationProfilFirstName: [this.user.firstName, Validators.required],
        modificationProfilLastName: [this.user.lastName, Validators.required],
        modificationProfilUsername: [this.user.username, Validators.required],
        modificationProfilImage: [null, Validators.required],
    });
  }

  toggleModification(){
    this.modification = !this.modification;
  }

  get f() { return this.modificationForm.controls; }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.modificationForm.patchValue({
          file: reader.result
       });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
        console.log(file);
      };
    }
  }

  onModification(){
      this.submitted = true;

      // stop here if form is invalid
      if (this.modificationForm.invalid) {
          return;
      }

      this.loading = true;

      const newUser = new User({
        userName: this.f.modificationProfilUsername.value,
        fisrtName: this.f.modificationProfilFirstName.value,
        lastName: this.f.modificationProfilLastName.value,
        img: this.f.modificationProfilImage.value,
      })

      this.UserService.update(newUser)
          .subscribe(
              data => {
                this.alertService.success('Profile modified successfully', true);
                this.loading = false;
                this.toggleModification();

              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
