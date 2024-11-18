import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

// faq item interface
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-landing-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {

  FAQs: FAQItem[] = [];

  constructor () { }

  ngOnInit(): void {
    this.FAQs = [
      {
        id: 1,
        question: 'Can I use this template for my client?',
        answer: 'Yup, the marketplace license allows you to use this theme in any end products. For more information on licenses, please refere here.',
      },
      {
        id: 2,
        question: 'Can this theme work with WordPress?',
        answer: "No. This is a HTML template. It won't directly with WordPress, though you can convert this into WordPress compatible theme.",
      },
      {
        id: 3,
        question: 'How do I get help with the theme?',
        answer: 'Use our dedicated support email (support@coderthemes.com) to send your issues or feedback. We are here to help anytime.',
      },
      {
        id: 4,
        question: 'Will you regularly give updates of Hyper?',
        answer: 'Yes, We will update the Hyper regularly. All the future updates would be available without any cost.',
      }
    ]
  }

}
