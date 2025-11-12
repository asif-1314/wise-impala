import { LightningElement, track, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CONTACT_FILTER_CHANNEL from '@salesforce/messageChannel/ContactFilter__c';

export default class FilterPanel extends LightningElement {
  @track nameContains = '';

  @wire(MessageContext)
  messageContext;

  handleNameChange(event) {
    this.nameContains = event.target.value;
  }

  handleApplyClick() {
    this.publishFilter();
  }

  handleClearClick() {
    this.nameContains = '';
    this.publishFilter();
  }

  //publish the message through the message channle: 
    //syntax: publish(messageContext, CHANNEL, payload)
  publishFilter() {
    const message = {
      criteria: {
        nameContains: this.nameContains
      },
      // helpful metadata for tracing loops and versioning
      meta: {
        source: 'filterPanel',
        timestamp: Date.now()
      }
    };
    publish(this.messageContext, CONTACT_FILTER_CHANNEL, message);
  }
}
