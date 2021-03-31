import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoadorModel } from 'src/models/doador.models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  public nome: String;
  public idade: Number;
  public form: FormGroup;
  public doador: DoadorModel[] = [];

  /**
   * 
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required,
      ])],
      
      idade: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(2),
        Validators.required,        
      ])],
      
      sangue: ['', Validators.compose([
        Validators.required,
      ])]
    });
  }
  
  /**
   * 
   */
  add() {
    const id = this.doador.length + 1;
    const nome = this.form.controls['nome'].value;
    const idade = this.form.controls['idade'].value;
    const sangue = this.form.controls['sangue'].value;
    this.doador.push(new DoadorModel(id, nome, idade, sangue));
    this.save();
    this.clear();
    alert(`Olá ${nome}!! Agora você é um doador`);
  }

  /**
   * 
   */
  save() {
    const data = JSON.stringify(this.doador);
    localStorage.setItem('persona', data);
  }
  
  /**
   * 
   */
  remove(doador: DoadorModel){
    const index = this.doador.indexOf(doador);
    if(index >= 0) {
      this.doador.splice(index, 1)
    };
    this.save();
  }

  /**
   * 
   */
  clear() {
    this.form.reset();
  }
  
}
