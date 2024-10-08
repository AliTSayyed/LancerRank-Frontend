import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubmitReviewComponent } from './submit-review/submit-review.component';
import { FreelancerReviewComponent } from './freelancer-review/freelancer-review.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { ManualFreelancerReviewComponent } from './manual-freelancer-review/manual-freelancer-review.component';

const routes: Routes = [{
  path:'',
  component: HomeComponent
},
{
  path:'submit-review',
  component: SubmitReviewComponent
},
{
  path:'freelancer/:id', // use id to specify the freelancer 
  component: FreelancerReviewComponent
},
{
  path:'manualfreelancer/Bill', // manuall average score review page (for when database is down)
  component: ManualFreelancerReviewComponent
},
{
  path:'user/:id', // use id to specify the user 
  component: UserReviewComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
