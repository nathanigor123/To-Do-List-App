import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditTaskComponent } from './new-edit-task.component';

describe('NewEditTaskComponent', () => {
  let component: NewEditTaskComponent;
  let fixture: ComponentFixture<NewEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEditTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
