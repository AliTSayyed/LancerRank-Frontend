import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { Review, Reviews, User } from '../../../../types';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../core/services/reviews.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.scss'
})
export class UserReviewComponent {

  constructor(private userService: UsersService, private reviewService:ReviewsService, private route: ActivatedRoute){}
  
  // store the user id, it is a string because the id in the url is a string. The review.component.html will provide the id. 
  userId:string | null= '';
  
  // store the user object
  user: User = {
    id: 0,
    user_name: ""
  }

  // store all the related user's reviews. 
  userReviews: Review[] = [];

  // on page initilization, get the user id from the url, if it exists, get the user object and all the reviews related to that user. 
  ngOnInit(): void{
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId){
      this.fetchUser(this.userId);
      this.fetchUserReviews(this.userId);
    }
  }

  // method to get the user object using the user's id. 
  fetchUser(id:string){
    this.userService.getOneUser(`https://lancerrank-backend.onrender.com/api/users/${id}`).subscribe((user:User) => {
      this.user = user
    });
  }
  
  // method to get all the reviews for a user using their id. Filtering is done on backend. 
  fetchUserReviews(id:string){
    this.reviewService.getReviewsNoParam(`https://lancerrank-backend.onrender.com/api/reviews/users/${id}`).subscribe((reviews: Review[]) => {
      this.userReviews = reviews;
    });
  }

}
