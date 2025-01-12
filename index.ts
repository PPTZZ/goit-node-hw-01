import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} from './contacts';
import { ActionParams } from './global/types';
import { program } from 'commander';


program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts() as ActionParams;


const invokeAction = ({ action, id, name = '', email = '', phone = '' }: ActionParams) => {
    switch (action) {
      case "list":
        listContacts()
        break;
  
      case "get":
        getContactById(Number(id))
        break;
  
      case "add":
        addContact(name,email,phone)
        break;
  
      case "remove":
        removeContact(Number(id))
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }

  
  invokeAction(argv);