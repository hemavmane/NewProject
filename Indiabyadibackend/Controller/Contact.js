
const ContactModal = require('../Modal/Contactus');





class Contact {
  async AddContact(req, res) {
    try {
        const {name,phone,email,message} = req.body;
        const Contact = new ContactModal({ name,phone,email,message });
        let savedContact = await Contact.save();
        if (savedContact) {
            return res.status(200).json({ message: 'Contact added successfully', Contact: savedContact});
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
        const Contact = await ContactModal.find({});
        res.status(200).json(Contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }
  async Trash(req, res) {
    try {
        const { id } = req.params;
        await ContactModal.findByIdAndDelete(id);
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  }
  
}
const ContactController = new Contact();
module.exports = ContactController;
