import { Component, Input, OnInit } from '@angular/core';
import { FileItem } from '../profile.model';

@Component({
  selector: 'app-profile-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  @Input() files: FileItem[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
