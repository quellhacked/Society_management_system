import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/users.json');

export interface User {
    id: string;
    name: string;
    flat: string;
    phone: string;
    email: string;
    password?: string;
    type: string;
    role: string;
}

export function getUsers(): User[] {
    try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading users data:', error);
        return [];
    }
}

export function saveUsers(users: User[]) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error saving users data:', error);
    }
}

export function updateUserRole(id: string, newRole: string) {
    const users = getUsers();
    const updatedUsers = users.map(user =>
        user.id === id ? { ...user, role: newRole } : user
    );
    saveUsers(updatedUsers);
    return updatedUsers.find(u => u.id === id);
}

export function deleteUser(id: string) {
    const users = getUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    if (users.length === filteredUsers.length) return false; // User not found
    saveUsers(filteredUsers);
    return true;
}

export function addUser(user: Omit<User, 'id'>) {
    const users = getUsers();
    // Check if email already exists
    if (users.find(u => u.email === user.email)) {
        return null;
    }
    const newUser = { ...user, id: Date.now().toString() };
    users.push(newUser);
    saveUsers(users);
    return newUser;
}

// Complaints & Notices - Helpers
const complaintsPath = path.join(process.cwd(), 'src/data/complaints.json');
const noticesPath = path.join(process.cwd(), 'src/data/notices.json');

export function getComplaints() {
    try {
        const fileData = fs.readFileSync(complaintsPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading complaints:', error);
        return [];
    }
}

export function getNotices() {
    try {
        const fileData = fs.readFileSync(noticesPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading notices:', error);
        return [];
    }
}

// Facilities & Bookings
const facilitiesPath = path.join(process.cwd(), 'src/data/facilities.json');
const bookingsPath = path.join(process.cwd(), 'src/data/bookings.json');

export function getFacilities() {
    try {
        const fileData = fs.readFileSync(facilitiesPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading facilities:', error);
        return [];
    }
}

export function getBookings() {
    try {
        const fileData = fs.readFileSync(bookingsPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading bookings:', error);
        return [];
    }
}

export function addBooking(booking: any) {
    const bookings = getBookings();
    const newBooking = { ...booking, id: Date.now().toString(), status: 'Pending' };
    bookings.push(newBooking);
    try {
        fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));
        return newBooking;
    } catch (error) {
        console.error('Error saving booking:', error);
        return null;
    }
}

export function updateBookingStatus(id: string, status: string) {
    const bookings = getBookings();
    const updatedBookings = bookings.map((booking: any) =>
        booking.id === id ? { ...booking, status } : booking
    );
    try {
        fs.writeFileSync(bookingsPath, JSON.stringify(updatedBookings, null, 2));
        return updatedBookings.find((b: any) => b.id === id);
    } catch (error) {
        console.error('Error updating booking status:', error);
        return null;
    }
}

// Parking
const parkingPath = path.join(process.cwd(), 'src/data/parking.json');

export function getParkingSlots() {
    try {
        const fileData = fs.readFileSync(parkingPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading parking data:', error);
        return [];
    }
}

export function assignSlot(slotId: string, flat: string) {
    const slots = getParkingSlots();
    const updatedSlots = slots.map((slot: any) =>
        slot.id === slotId ? { ...slot, flat, status: 'Occupied' } : slot
    );
    try {
        fs.writeFileSync(parkingPath, JSON.stringify(updatedSlots, null, 2));
        return true;
    } catch (error) {
        console.error('Error assigning slot:', error);
        return false;
    }
}

export function registerVehicle(slotId: string, vehicleNumber: string, vehicleModel: string) {
    const slots = getParkingSlots();
    const updatedSlots = slots.map((slot: any) =>
        slot.id === slotId ? { ...slot, vehicleNumber, vehicleModel } : slot
    );
    try {
        fs.writeFileSync(parkingPath, JSON.stringify(updatedSlots, null, 2));
        return true;
    } catch (error) {
        console.error('Error registering vehicle:', error);
        return false;
    }
}

export function addParkingSlot(slotNumber: string, type: string) {
    const slots = getParkingSlots();
    // Check if slot already exists
    if (slots.find((s: any) => s.slotNumber === slotNumber)) {
        return false;
    }
    const newSlot = {
        id: Date.now().toString(),
        slotNumber,
        type,
        status: 'Available',
        flat: null,
        vehicleNumber: null,
        vehicleModel: null
    };
    slots.push(newSlot);
    try {
        fs.writeFileSync(parkingPath, JSON.stringify(slots, null, 2));
        return newSlot;
    } catch (error) {
        console.error('Error adding parking slot:', error);
        return null;
    }
}

export function deleteParkingSlot(id: string) {
    const slots = getParkingSlots();
    const filteredSlots = slots.filter((slot: any) => slot.id !== id);
    if (slots.length === filteredSlots.length) return false;
    try {
        fs.writeFileSync(parkingPath, JSON.stringify(filteredSlots, null, 2));
        return true;
    } catch (error) {
        console.error('Error deleting parking slot:', error);
        return false;
    }
}

// Accounting & Vendors
const accountingPath = path.join(process.cwd(), 'src/data/accounting.json');
const vendorsPath = path.join(process.cwd(), 'src/data/vendors.json');

export function getTransactions() {
    try {
        const fileData = fs.readFileSync(accountingPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading accounting data:', error);
        return [];
    }
}

export function addTransaction(transaction: any) {
    const transactions = getTransactions();
    const newTransaction = { ...transaction, id: Date.now().toString() };
    transactions.push(newTransaction);
    try {
        fs.writeFileSync(accountingPath, JSON.stringify(transactions, null, 2));
        return newTransaction;
    } catch (error) {
        console.error('Error adding transaction:', error);
        return null;
    }
}

export function getVendors() {
    try {
        const fileData = fs.readFileSync(vendorsPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading vendors data:', error);
        return [];
    }
}

export function addVendor(vendor: any) {
    const vendors = getVendors();
    const newVendor = { ...vendor, id: Date.now().toString() };
    vendors.push(newVendor);
    try {
        fs.writeFileSync(vendorsPath, JSON.stringify(vendors, null, 2));
        return newVendor;
    } catch (error) {
        console.error('Error adding vendor:', error);
        return null;
    }
}

// Communication
const discussionsPath = path.join(process.cwd(), 'src/data/discussions.json');
const alertsPath = path.join(process.cwd(), 'src/data/alerts.json');

export function getDiscussions() {
    try {
        const fileData = fs.readFileSync(discussionsPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading discussions data:', error);
        return [];
    }
}

export function addDiscussion(discussion: any) {
    const discussions = getDiscussions();
    const newDiscussion = { ...discussion, id: Date.now().toString(), replies: [] };
    discussions.push(newDiscussion);
    try {
        fs.writeFileSync(discussionsPath, JSON.stringify(discussions, null, 2));
        return newDiscussion;
    } catch (error) {
        console.error('Error adding discussion:', error);
        return null;
    }
}

export function addReply(discussionId: string, reply: any) {
    const discussions = getDiscussions();
    const discussion = discussions.find((d: any) => d.id === discussionId);
    if (discussion) {
        discussion.replies.push(reply);
        try {
            fs.writeFileSync(discussionsPath, JSON.stringify(discussions, null, 2));
            return true;
        } catch (error) {
            console.error('Error adding reply:', error);
            return false;
        }
    }
    return false;
}

export function getAlerts() {
    try {
        const fileData = fs.readFileSync(alertsPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading alerts data:', error);
        return [];
    }
}

export function addAlert(alert: any) {
    const alerts = getAlerts();
    const newAlert = { ...alert, id: Date.now().toString() };
    alerts.push(newAlert);
    try {
        fs.writeFileSync(alertsPath, JSON.stringify(alerts, null, 2));
        return newAlert;
    } catch (error) {
        console.error('Error adding alert:', error);
        return null;
    }
}

// Group Chat
const chatPath = path.join(process.cwd(), 'src/data/chat.json');

export function getChatMessages() {
    try {
        const fileData = fs.readFileSync(chatPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading chat data:', error);
        return [];
    }
}

export function addChatMessage(message: any) {
    const messages = getChatMessages();
    const newMessage = { ...message, id: Date.now().toString(), timestamp: new Date().toISOString() };
    // Keep only last 100 messages to prevent file from growing too large
    if (messages.length > 100) messages.shift();
    messages.push(newMessage);
    try {
        fs.writeFileSync(chatPath, JSON.stringify(messages, null, 2));
        return newMessage;
    } catch (error) {
        console.error('Error adding chat message:', error);
        return null;
    }
}

// Documents
const documentsPath = path.join(process.cwd(), 'src/data/documents.json');

export function getDocuments() {
    try {
        const fileData = fs.readFileSync(documentsPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading documents data:', error);
        return [];
    }
}

export function addDocument(doc: any) {
    const documents = getDocuments();
    const newDoc = { ...doc, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] };
    documents.push(newDoc);
    try {
        fs.writeFileSync(documentsPath, JSON.stringify(documents, null, 2));
        return newDoc;
    } catch (error) {
        console.error('Error adding document:', error);
        return null;
    }
}

// Polls
const pollsPath = path.join(process.cwd(), 'src/data/polls.json');

export function getPolls() {
    try {
        const fileData = fs.readFileSync(pollsPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading polls data:', error);
        return [];
    }
}

export function createPoll(poll: any) {
    const polls = getPolls();
    const newPoll = {
        ...poll,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        status: 'Active',
        options: poll.options.map((opt: string) => ({ text: opt, votes: 0 }))
    };
    polls.push(newPoll);
    try {
        fs.writeFileSync(pollsPath, JSON.stringify(polls, null, 2));
        return newPoll;
    } catch (error) {
        console.error('Error creating poll:', error);
        return null;
    }
}

export function votePoll(pollId: string, optionIndex: number) {
    const polls = getPolls();
    const pollIndex = polls.findIndex((p: any) => p.id === pollId);
    if (pollIndex === -1) return null;

    polls[pollIndex].options[optionIndex].votes += 1;

    try {
        fs.writeFileSync(pollsPath, JSON.stringify(polls, null, 2));
        return polls[pollIndex];
    } catch (error) {
        console.error('Error voting on poll:', error);
        return null;
    }
}
