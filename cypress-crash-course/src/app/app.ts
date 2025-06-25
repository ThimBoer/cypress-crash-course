import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface JsonModel {
  id?: number;
  title?: string;
  body?: string;
  userId?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  protected loginError = false;
  protected showTable = false;
  protected users = [{ username: '123', password: '123' }];
  protected items: JsonModel[] = [];
  protected title = 'cypressexample';

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  form = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    userId: new FormControl(1),
    id: new FormControl(0)
  });

  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.httpClient.get<JsonModel[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(result => {
        this.items = result.slice(0, 10);
      });
  }

  fillInForm(): void {
    const data = { ...this.form.value, id: this.items.length + 1 } as JsonModel;
    this.items.push(data);
    this.form.reset({ title: '', body: '', userId: 0, id: 0 });
  }

  login(): void {
    const { username, password } = this.loginForm.value;
    const validUser = this.users.some(user => user.username === username && user.password === password);
    if (validUser) {
      this.showTable = true;
      this.loginForm.reset();
      this.loginError = false;
    } else {
      this.loginError = true;
      setTimeout(() => (this.loginError = false), 2000);
    }
  }
}
