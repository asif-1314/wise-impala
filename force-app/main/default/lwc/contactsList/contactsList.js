import { LightningElement, track, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import CONTACT_FILTER_CHANNEL from '@salesforce/messageChannel/ContactFilter__c';
import getContacts from '@salesforce/apex/ContactExplorerController.searchContacts';

export default class ContactsList extends LightningElement {
  @track contacts = [];
  @track error;
  subscription = null;
  currentFilter = '';

  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    this.subscribeToChannel();
    // Optionally, load default set
    this.loadContacts('');
  }

  disconnectedCallback() {
    this.unsubscribeFromChannel();
  }

  //subscribe( messageContext, messageChannel, handleReceivedMessage, scope)
  subscribeToChannel() {
    if (this.subscription) {
      return;
    }
    this.subscription = subscribe(
      this.messageContext,
      CONTACT_FILTER_CHANNEL,
      (message) => this.handleMessage(message),
      { scope: APPLICATION_SCOPE } // choose scope carefully
    );
  }

  unsubscribeFromChannel() {
    if (this.subscription) {
      unsubscribe(this.subscription);
      this.subscription = null;
    }
  }

  handleMessage(message) {
    // Defensive checks
    const criteria = message && message.criteria ? message.criteria : {};
    const nameContains = criteria.nameContains || '';
    // avoid loops: if new filter equals current, skip
    if (nameContains === this.currentFilter) return;

    this.currentFilter = nameContains;
    this.loadContacts(nameContains);
  }

  async loadContacts(nameFragment) {
    this.error = undefined;
    try {
      const result = await getContacts({name: nameFragment, email: '', accountName: '', pageSize: 50, offset: null})
      console.log(result);
      
      this.contacts = result || [];
    } catch (err) {
      this.contacts = [];
      this.error = err;
      // Keep console logging for easier debugging during development
      // eslint-disable-next-line no-console
      console.error('Error loading contacts', err);
    }
  }

  // Utility for template iteration key
  get hasContacts() {
    return this.contacts && this.contacts.length > 0;
  }
}
