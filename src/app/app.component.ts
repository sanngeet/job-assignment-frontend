import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  steps: any;
  step: any;
  items: any;
  item: any;
  showStepForm = false;
  showAddItem = true;

  itemForm: any = {
    id: '',
    name: '',
    title: '',
    description: '',
  };

  stepForm: any = {
    name: '',
  };

  toastInfo: any = {
    message: 'Hello',
    status: 'danger',
    visibility: false,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.steps().subscribe((data: any) => {
      this.steps = data.response.results;
      this.step = this.steps[0];
      this.items = this.steps[0].items;
    });
  }

  getStep(step: any) {
    this.step = step;
    this.items = this.step.items;
    this.showStepForm = false;
    this.showAddItem = true;
  }

  getItem(item: any) {
    this.itemForm.id = item.item_id;
    this.itemForm.name = item.item_name;
    this.itemForm.title = item.item_title;
    this.itemForm.description = item.item_description;
    this.showStepForm = false;
  }

  addStep() {
    this.showStepForm = true;
    this.step = null;
    this.showAddItem = false;
  }

  addItem() {
    this.itemForm.id = '';
    this.showStepForm = false;
    this.item = null;
  }

  saveItem() {
    if (this.itemForm.id) {
      this.updateItem();
      return;
    }
    if (
      this.itemForm.name &&
      this.itemForm.title &&
      this.itemForm.description
    ) {
      let req = {
        step_id: this.step.step_id,
        item: this.itemForm.name,
        title: this.itemForm.title,
        description: this.itemForm.description,
      };
      this.apiService.createItem(req).subscribe((data: any) => {
        if (data.success) {
          this.steps = data.response.results.steps;
          let currentIndex = this.steps.findIndex(
            (x: any) => x.step_id === this.step.step_id
          );
          this.step = this.steps[currentIndex];
          this.items = this.step.items;

          this.itemForm.name = '';
          this.itemForm.title = '';
          this.itemForm.description = '';
          this.toastInfo.status = 'success';
          this.toastInfo.message = data.response.results.msg;
        } else {
          this.toastInfo.status = 'danger';
          this.toastInfo.message = data.response.results.msg;
        }
      });
    } else {
      this.toastInfo.status = 'danger';
      this.toastInfo.message = 'Please fill in all the fields';
    }
    this.toastInfo.visibility = true;
  }

  updateItem() {
    if (
      this.itemForm.id &&
      this.itemForm.name &&
      this.itemForm.title &&
      this.itemForm.description
    ) {
      let req = {
        step_id: this.step.step_id,
        item_id: this.itemForm.id,
        item: this.itemForm.name,
        title: this.itemForm.title,
        description: this.itemForm.description,
      };
      this.apiService.updateItem(req).subscribe((data: any) => {
        if (data.success) {
          this.steps = data.response.results.steps;
          let currentIndex = this.steps.findIndex(
            (x: any) => x.step_id === this.step.step_id
          );
          this.step = this.steps[currentIndex];
          this.items = this.step.items;

          this.itemForm.name = '';
          this.itemForm.title = '';
          this.itemForm.description = '';
          this.toastInfo.status = 'success';
          this.toastInfo.message = data.response.results.msg;
        } else {
          this.toastInfo.status = 'danger';
          this.toastInfo.message = data.response.results.msg;
        }
      });
    } else {
      this.toastInfo.status = 'danger';
      this.toastInfo.message = 'Please fill in all the fields';
    }
    this.toastInfo.visibility = true;
  }

  saveStep() {
    if (this.stepForm.name) {
      let req = {
        step: this.stepForm.name,
      };
      this.apiService.createStep(req).subscribe((data: any) => {
        if (data.success) {
          this.steps = data.response.results.steps;
          this.stepForm.name = '';
          this.toastInfo.status = 'success';
          this.toastInfo.message = data.response.results.msg;
        } else {
          this.toastInfo.status = 'danger';
          this.toastInfo.message = data.response.results.msg;
        }
      });
    } else {
      this.toastInfo.status = 'danger';
      this.toastInfo.message = 'Please fill in all the fields';
    }
    this.toastInfo.visibility = true;
  }

  deleteStep(step: any) {
    let req = {
      stepId: step.step_id,
    };
    this.apiService.deleteStep(req).subscribe((data: any) => {
      if (data.success) {
        this.steps = data.response.results.steps;
        this.toastInfo.status = 'success';
        this.toastInfo.message = data.response.results.msg;
      } else {
        this.toastInfo.status = 'danger';
        this.toastInfo.message = data.response.results.msg;
      }
      this.toastInfo.visibility = true;
    });
  }

  deleteItem(item: any) {
    console.log('delete item');
    let req = {
      itemId: item.item_id,
    };
    this.apiService.deleteItem(req).subscribe((data: any) => {
      if (data.success) {
        this.steps = data.response.results.steps;
        let currentIndex = this.steps.findIndex(
          (x: any) => x.step_id === this.step.step_id
        );
        this.step = this.steps[currentIndex];
        this.items = this.step.items;

        this.toastInfo.status = 'success';
        this.toastInfo.message = data.response.results.msg;
      } else {
        this.toastInfo.status = 'danger';
        this.toastInfo.message = data.response.results.msg;
      }
      this.toastInfo.visibility = true;
    });
  }

  previous() {
    let currentIndex = this.steps.findIndex(
      (x: any) => x.step_id === this.step.step_id
    );
    if (currentIndex > 0) {
      this.getStep(this.steps[currentIndex - 1]);
    }
  }

  next() {
    let currentIndex = this.steps.findIndex(
      (x: any) => x.step_id === this.step.step_id
    );
    if (currentIndex < this.steps.length - 1) {
      this.getStep(this.steps[currentIndex + 1]);
    }
  }
}
