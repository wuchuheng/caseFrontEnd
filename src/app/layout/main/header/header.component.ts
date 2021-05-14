import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../services/graphql/category/category.service';
import {CasesService} from '../../../services/graphql/cases/cases.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navs: GrapqlType.CategoriesType = []
  isVisitMenu = false
  constructor(
    private router: Router,
    private categoriesService: CategoryService,
    private caseService: CasesService,
    private route: ActivatedRoute
  ) { }

  currentCategoryId = 0

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentCategoryId = Number(params.categoryId) || 0
    })
    this.initCategorySubject()
  }
  onRedirect(categoryId: number): void
  {
    const pageInfo: GrapqlType.CaseParamsType = {
      page: 1,
      pageSize: 1000,
      keyword: '',
      categoryId: 0,
    }

    let url = ''
    if (categoryId === 0) {
      url = '/'
    } else {
      url = `/?categoryId=${categoryId}`
    }
    pageInfo.categoryId = categoryId
    this.router.navigateByUrl(url)
    this.caseService.getCase(pageInfo)
  }

  initCategorySubject(): void
  {
    this.categoriesService.categorySubject.subscribe(res => {
      this.navs = [{id: 0, name: '全部'}, ...res.categories]
    })
    this.categoriesService.getCategories()
  }

  activeTab(): void
  {

  }
}
