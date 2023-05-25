import { useEffect, useState,useRef } from 'react';
import './contact-form.css';


export function ContactForm(){
    return(
<>
<div className='form-wrap'>
<h1>CONTACT US!</h1>
    <input required type='text' placeholder='Name'></input>
    <input required type='text' placeholder='Surname'></input>
    <input required type='email' placeholder='Email'></input>
    <input required type='tel' placeholder='Tel. Number'></input>
    <input required className='text-area' type='textarea' placeholder='Your message...'></input>
</div>
    
</>
    );
}