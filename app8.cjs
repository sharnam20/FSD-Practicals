const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()
const port = 5000

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files allowed!'))
    }
  }
})

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=> {
    res.send(`
    <h1>PDF Upload App</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="pdf" accept=".pdf" required>
      <button type="submit">Upload PDF</button>
    </form>
    `)
})

app.post('/upload', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No PDF file uploaded!')
  }
  res.send(`PDF uploaded successfully: ${req.file.filename}`)
})

app.listen(port, ()=> {
    console.log(`App8 PDF Upload Running on Port ${port}`)
})