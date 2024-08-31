import { Component } from '@angular/core';
import { ReviewsService } from '../../core/services/reviews.service';
import { Review, Reviews } from '../../../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private reviewService: ReviewsService, private router: Router) {}
  // store the reviews, filtered reviews and if the reviews are filtered.
  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  isFiltered: boolean = false;

  // these vairables are used for the paginator.
  rows: number = 9;
  first = 0;
  totalRecords: number = 0;

  // take use to submit-review page to write a review
  submissionPage() {
    this.router.navigate(['/submit-review']);
  }

  // move screen down when browse reviews button is pressed.
  browseReviews() {
    window.scrollBy({
      top: 675,
      left: 0,
      behavior: 'smooth',
    });
  }

  // if the next page on the paginator is pressed then update the reviews array with the next set of data.
  onPageChange(event: any) {
    const pageIndex = event.page + 1; // primeng paginator starts at page 0 but django starts at page 1. Need to adjust for 0 based index.
    if (this.isFiltered) {
      this.paginateFilteredReviews(pageIndex, event.rows);
    } else {
      this.fetchReviews(pageIndex, event.rows);
    }
    this.first = event.first; // first keeps track of the index in the review list and knows what index item to start displaying on a certain page.
  }

  // get reviews using the review service from the core module.
  fetchReviews(page: number, perPage: number) {
    this.reviewService
      .getReviews('https://lancerrank-backend.onrender.com/api/reviews/', { page, perPage })
      .subscribe((reviews: Reviews) => {
        this.reviews = reviews.reviews;
        this.totalRecords = reviews.total;
      });
  }

  //on page initilization send the first 9 reviews from the database. More reviews can be seen with the paginator.
  ngOnInit() {
    this.fetchReviews(1, this.rows);
  }

  // this will change the reviews data set to what the filter selection was
  onReviewsFiltered(filteredReviews: Reviews) {
    // if the clear filter button is pressed, it will emit a Reviews with perpage of 10. This notifies we should reset the page to what it was at the start.
    if (filteredReviews.perPage === 10) {
      this.isFiltered = false;
      this.ngOnInit();
    } else {  // if not cleared, then display the filtered/sorted reveiws with pagination.
      this.isFiltered = true;
      this.filteredReviews = filteredReviews.reviews;
      this.paginateFilteredReviews(1, this.rows);
    }
  }

  // this will adjust the selection of reviews to be shown from the filtered reviews array
  paginateFilteredReviews(page: number, perPage: number) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    this.reviews = this.filteredReviews.slice(start, end); // this line updates what is shown on the screen to the filtered selection. 
    this.totalRecords = this.filteredReviews.length;
  }
}
