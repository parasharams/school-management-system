import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ui-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {

  constructor (private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  /**
* opens modal
* @param content modal content
*/
  open(content: TemplateRef<NgbModal>): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  /**
   * opens different size modals
   * @param content modal content
   * @param size size of modal
   */
  openModalWithSize(content: TemplateRef<NgbModal>, size: string): void {
    this.modalService.open(content, { size: size });
  }

  /**
   * opens scrollable modal for long content
   * @param content modal content
   */
  openScrollableModal(content: TemplateRef<NgbModal>): void {
    this.modalService.open(content, { scrollable: true });
  }

  /**
 * Opens the modal vertically centered
 * @param content modal content
 */
  openVerticallyCentered(content: TemplateRef<NgbModal>): void {
    this.modalService.open(content, { centered: true });
  }


}
