import { MembersListService } from 'src/app/services/members/members-list.service';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-sign-in-method',
  templateUrl: './sign-in-method.component.html',
})
export class SignInMethodComponent implements OnInit, OnDestroy {
  showChangeEmailForm: boolean = false;
  showChangePasswordForm: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  userEmail:any
  private unsubscribe: Subscription[] = [];
  @Input() ExpectedProp:Member;
  constructor(private cdr: ChangeDetectorRef,private Membersservice: MembersListService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

  }

  ngOnInit(): void {this.userEmail=this.ExpectedProp.Email ,console.log( "sign"+this.userEmail)}

  toggleEmailForm(show: boolean) {
    this.showChangeEmailForm = show;
  }

  saveEmail() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.showChangeEmailForm = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  togglePasswordForm(show: boolean) {
    this.showChangePasswordForm = show;
  }

  savePassword() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.showChangePasswordForm = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
