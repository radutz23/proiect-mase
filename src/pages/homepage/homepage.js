import { useEffect, useState,useRef } from 'react';
import './homepage.css';
import { HamburgerMenu } from '../hamburger-menu/hamburger';


export function Homepage(){
    return(
<>
<HamburgerMenu></HamburgerMenu>
<div className='homepage-container'>



<h1 className='homepage-title'>NATURE.</h1>
<p className='homepage-subtitle'>"Unveiling the Wonders, Preserving the Harmony"</p>
<div class="contact-links">
            <a href="https://www.instagram.com/radutz23" target="_blank" 
               class="btn contact-details"><i class="fab fa-instagram"></i>
               </a>
            <a
               href="https://twitter.com/radutz23"
               target="_blank"
               class="btn contact-details"><i class="fab fa-twitter"></i>
              </a>
            <a href="https://github.com/radutz23" target="_blank" class="btn contact-details"> <i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/alexandru-catalin-radulescu" target="_blank" class="btn contact-details"><i class="fab fa-linkedin"></i></a>
            <a href="mailto:radulescu2306@gmail.com" class="btn contact-details"><i class="far fa-envelope"></i></a>
          </div>

<a className='homepage-button' href='/articles'>EXPLORE.</a>

</div>

</>
    );
}