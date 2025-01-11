import { Contact } from './global/types';
import 'colors';
import * as fs from 'fs';
import path from 'path';

const contactsPath = path.resolve('./db/contatcs.json');
const contactsList: Contact[] = JSON.parse(
	fs.readFileSync(contactsPath, 'utf8')
);

export const listContacts = (): void => {
	console.log(contactsList);
};

export const getContactById = (contactId: number): Contact => {
	const foundContact: Contact | undefined = contactsList.find(
		contact => Number(contact.id) === contactId
	);
	if (!foundContact) {
		throw new Error(`Contact with id ${contactId} not found`.red);
	}
	console.log(foundContact);
	return foundContact;
};

export const removeContact = (contactId: number): void => {
	const newContactList = contactsList.filter(
		contact => Number(contact.id) !== contactId
	);
	const data = JSON.stringify(newContactList);
	fs.writeFile(contactsPath, data, err => {
		if (err) {
			throw new Error(
				`The contact with the id: ${contactId} was not found`.red
			);
		}
		console.log('Contact removed successfully'.green);
	});
};

export const addContact = (
	name: string,
	email: string,
	phone: string
): void => {
	let id = Number(contactsList.at(-1)?.id) + 1;
	const newId = id.toString();
	const newContact: Contact = {
		id: newId,
		name,
		email,
		phone,
	};
	const newContactsList: Contact[] = [...contactsList, newContact];
	try {
		const data = JSON.stringify(newContactsList);
		fs.writeFileSync(contactsPath, data);
		console.log('Contact added successfully'.green);
	} catch (err) {
		throw new Error('Something went wrong, please try again later.'.red);
	}
};
