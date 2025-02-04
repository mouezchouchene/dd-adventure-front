import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart ,Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  constructor(private spinner: NgxSpinnerService, private router: Router) {}
  ngOnInit(): void {
   
    // this.spinner.show();

    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 5000);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinner.show(); 
      } else if (event instanceof NavigationEnd) {
        this.spinner.hide(); 
      }
    });


  }


  title = 'dd-adventure-front';


}
