const express = require('express')
const multer = require('multer')
const nodemailer = require('nodemailer')
const path = require('path')

const app = express()
const port = 4000;

app.set('views',__dirname+'/views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// Email transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

// Storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  }
}).single('fileupload');

// Routes
app.get('/portfolio', (req, res) => {
  res.render('portfolio', { message: null, contactMessage: null });
});

app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.render('portfolio', { message: err.code === 'LIMIT_FILE_SIZE' ? 'File too large. Max 2MB allowed.' : err.message, contactMessage: null });
    } else if (err) {
      return res.render('portfolio', { message: err.message, contactMessage: null });
    }
    if (!req.file) {
      return res.render('portfolio', { message: 'No file uploaded.', contactMessage: null });
    }
    res.render('portfolio', { message: 'File uploaded successfully!', contactMessage: null });
  });
});

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.render('portfolio', { message: null, contactMessage: 'All fields are required.' });
  }

  const mailOptions = {
    from: email,
    to: 'your-email@gmail.com',
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render('portfolio', { message: null, contactMessage: 'Message sent successfully!' });
  } catch (error) {
    res.render('portfolio', { message: null, contactMessage: 'Failed to send message. Please try again.' });
  }
});

app.listen(port, () => {
  console.log("Portfolio App Running on Port 4000");
});