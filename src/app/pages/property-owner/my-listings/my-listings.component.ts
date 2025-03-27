import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddListingComponent } from '../add-listing/add-listing.component';
import { PropertiesService } from 'src/app/services/property-owner/properties.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.scss']
})
export class MyListingsComponent  {

  isFocused = false;


  displayedColumns: string[] = [
    'image',
    'streetAddress',
    'place',
    'placeType',
    'country',
    'price',

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

  constructor(
    private listingsService:PropertiesService,
    private dialog:MatDialog,
    private elementRef: ElementRef

  ){

    this.getAllListings();
  }




  ngOnInit() {

  }


  getAllListings() {
    this.listingsService.getAllPropertiesByUser().subscribe((res: any) => {
      console.log("res =>", res);
      this.dataSource = new MatTableDataSource(res);
      this.length = res.length;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.applyDefaultSort();

      console.log("properties =>", this.dataSource);
    });
  }




  // Method to apply default sorting by 'id'
  applyDefaultSort() {
    if (this.sort && this.dataSource) {
      const defaultSort: Sort = {
        active: 'id',
        direction: 'desc'
      };
      this.sort.active = defaultSort.active;
      this.sort.direction = defaultSort.direction;
      this.sort.sortChange.emit(defaultSort);
      this.dataSource.sort = this.sort;
    }
  }


  deleteListing(id: any) {


    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to remove this property ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listingsService.deletePropertyById(id).subscribe((res) => {
          console.warn('delete property => ', res);
          this.dataSource.data = this.dataSource.data.filter((property) => property.id !== id);
        });
      } else {
        console.log('Deletion canceled');
      }
    });
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



  addNewListing() {
    const dialogRef = this.dialog.open(AddListingComponent, {
      width: '100%',
      height: "100%",
      panelClass: 'add-listing-dialog',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      this.getAllListings();
    });
  }



}

