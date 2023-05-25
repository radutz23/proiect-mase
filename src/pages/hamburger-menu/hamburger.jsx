import { useEffect, useState,useRef } from 'react';
import './hamburger.css';


export function HamburgerMenu(){
    return(
<>

<div class="menu-wrap">
        <input type="checkbox" class="toggler"/>
        <div class="hamburger"><div></div></div>
        <div class="menu">
            <div>
                <div>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/chat">Catch up with us!</a></li>
                        <li><a href="/articles">Articles</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
</>
    );
}