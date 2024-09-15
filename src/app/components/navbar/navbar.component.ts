import { Component, HostListener, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentTheme = 'dark'; 

  isTransparent: boolean = false;
  isHome: boolean = false;

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isHome = this.router.url === '/';
        this.isTransparent = this.isHome;
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = window.pageYOffset;

    if (this.isHome) {
      this.isTransparent = scrollOffset <= 50;
    }
  }
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    
    // Aggiorna il tema tramite il servizio
    this.themeService.setTheme(this.currentTheme);
  }

  closeDrawer() {
    const drawerToggle = document.querySelector('#my-drawer-3') as HTMLInputElement;
    if (drawerToggle) {
      drawerToggle.checked = false;
    }
  }

}
