import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {


  isFocused = false;


  displayedColumns: string[] = [
    'image',
    'Property',
    'Reviews',
    'Status',
    'Price',
    
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  length = 5;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  constructor(private listingsService:PropertiesListingsService){}

  ngOnInit() {
    this.getAllFavoriteListings();
  }


  getAllFavoriteListings()
  {
    this.listingsService.getFavoriteListings().subscribe((res:any)=>{
      console.log("listings =>"+res);
      
      this.dataSource = new MatTableDataSource(res);
      this.length = res.length;

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }


  deleteListing(row: any) {
   

    console.log("listing deleted !!!")
  }

  showDetail(row: any) {
   

    console.log("listing deleted !!!")
  }
  

  editListing(row: any) {
   

    console.log("listing edited !!!")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onInputFocus() {
    this.isFocused = true;
  }

  onInputBlur() {
    this.isFocused = false;
  }
}
