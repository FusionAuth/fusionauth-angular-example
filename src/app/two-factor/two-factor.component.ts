import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent implements OnInit {
  showNotEnabledMsg = true;
  twoFactorId: string;
  mainForm = new FormGroup({
    code: new FormControl('', [ Validators.required ]),
    trustComputer: new FormControl(''),
    twoFactorId: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private fusionAuthService: FusionAuthService, private router: Router) {
  }

  ngOnInit() {
    const twoFactorId = this.route.snapshot.paramMap.get('id');
    this.mainForm.get('twoFactorId').setValue(twoFactorId);
  }

  submit() {
    if (this.mainForm.valid) {
      this.fusionAuthService
        .twoFactorLogin(this.mainForm.value)
        .subscribe((e) => this.handleSuccess(e), (r) => this.handleFailure(r));
    }
  }

  handleFailure(error: HttpErrorResponse) {
    console.log(error);
    if (error.status === 404) {
      this.showExpiredMsg = true;
    } else if (error.status === 421) {
      this.showInvalidCodeMsg = true;
    }
  }

  handleSuccess(response: HttpResponse<any>) {
    console.log(response);
    //TODO: Save .body.user.email for change password by identity
    this.router.navigate(['/home']);
  }

}
