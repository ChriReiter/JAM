import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})

export class CompanyFormComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private route: ActivatedRoute) {

  }
}

