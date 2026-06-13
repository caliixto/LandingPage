import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsProjectComponent } from './projects-project.component';

describe('ProjectsProjectComponent', () => {
  let component: ProjectsProjectComponent;
  let fixture: ComponentFixture<ProjectsProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
