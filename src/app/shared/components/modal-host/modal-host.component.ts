import { Component, Inject, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalHostDirective } from 'src/app/directives/modal-host.directive';

@Component({
  selector: 'app-modal-host',
  templateUrl: './modal-host.component.html',
  styleUrls: ['./modal-host.component.scss']
})
export class ModalHostComponent implements OnInit {
  @ViewChild(ModalHostDirective, { static: true }) appModalHost!: ModalHostDirective;

  constructor(
    public dialogRef: MatDialogRef<ModalHostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  private loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    const viewContainerRef = this.appModalHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }
}
