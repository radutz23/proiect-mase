import { useEffect, useState,useRef } from 'react';
import './about-us.css';
import { ContactForm } from '../contact-form/contact-form';


export function AboutUs(){
    return(
<>

<div className='about-us-background'>
<p>Aplicația web dezvoltată are ca principal obiectiv protejarea, promovarea și dezvoltarea unei arii naturale protejate, în acest caz, o rezervație naturală. Utilizând tehnologia și accesibilitatea oferite de internet, aplicația oferă un mediu virtual interactiv prin care utilizatorii pot explora și înțelege bogăția și frumusețea acestui ecosistem unic. Prin intermediul aplicației, utilizatorii pot accesa informații actualizate despre flora și fauna din rezervație, pot vizualiza imagini și videoclipuri captivante, pot afla despre proiectele de conservare și pot participa la diverse activități educative și voluntare. De asemenea, aplicația facilitează comunicarea între administrația rezervației și comunitatea locală, prin intermediul forumurilor de discuții și a secțiunilor de știri. Cu ajutorul acestei aplicații web inovatoare, se încurajează implicarea activă a utilizatorilor în protejarea și conservarea resurselor naturale, promovând astfel conștientizarea și responsabilizarea față de mediul înconjurător.</p>
<ContactForm></ContactForm>
</div>

</>
    );
}