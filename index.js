//Importing the given data.
import {bookData} from './js/book-data.js';

//Class for creating a book that is filled with given data
class Book
{
    //Constructor to create the correspoding DOM Elements and import in the data for each book instance
    constructor(data)
    {
        this.book = data;

        this.comment = [];

        this.commentTick = 0;
        this.commentIterator = 0;

        this.bookEle = document.createElement("ul");

        this.button = document.createElement("button");

        this.authorEle = document.createElement("li");
        this.titleEle = document.createElement("li");
        this.subjectEle = document.createElement("li");
        this.languageEle = document.createElement("li");

        this.bookEle.setAttribute("id", "books");

        this.authorEle.classList.add("ul2")
        this.titleEle.classList.add("ul2")
        this.subjectEle.classList.add("ul2")
        this.languageEle.classList.add("ul2")

        this.button.classList.add("button");
    }

    //Method to call and initialize the DOM Elements to the HTML File
    init()
    {
        const that = this;
        this.authorEle.innerHTML = this.book.author;
        this.titleEle.innerHTML = this.book.title;
        this.subjectEle.textContent = this.book.subject;
        this.languageEle.innerHTML = this.book.language;

        this.button.innerHTML = "Comment";

        this.bookEle.appendChild(this.authorEle);
        this.bookEle.appendChild(this.titleEle);
        this.bookEle.appendChild(this.subjectEle);
        this.bookEle.appendChild(this.languageEle);
        this.bookEle.appendChild(this.button);

        document.body.querySelector(".wrapper").appendChild(this.bookEle);

        this.button.addEventListener("click", function()
        {
            that.commentBox();
        })
    }

    //Method to initialize/Render the comment box for that book instance
    commentBox()
    {
        this.commentTick++;

        const that = this;

        if(this.commentTick === 1)
        {
            this.commentField = document.createElement("input");
            this.commentSubmit = document.createElement("button");

            this.commentSubmit.innerHTML = "Submit a Comment";
            this.commentField.setAttribute("maxLength", "280");
            this.commentField.setAttribute("id", "commentField");



            this.bookEle.appendChild(this.commentField);
            this.bookEle.appendChild(this.commentSubmit);

            this.bookEle.style.height = "350px";
        }
        this.commentSubmit.addEventListener("click", function()
        {
            that.commentInit();
        })
    }

    //Method to initialize/Render the comments onto the book instance
    commentInit()
    {

        const commentValue = document.getElementById("commentField").value;

        this.comment.push(commentValue);

        this.arrayInit = document.createElement("li");
        this.arrayInit.classList.add("commentLI");
        this.arrayInit.innerHTML = this.comment[this.commentIterator];
        this.bookEle.appendChild(this.arrayInit);

        this.commentIterator++;
    }
}

//Class for creating a new Book to be filled with text input information
class NewBook
{
    //Constructor to take in the data and store it in corresponding order
    constructor(author, title, subject, language)
    {
        this.author = author;
        this.title = title;
        this.subject = subject;
        this.language = language;
    }

    //Method that adds a new books to the array of data to be rerendered
    addBooks()
    {
        const authorInput = document.getElementById("authorField").value;
        const titleInput = document.getElementById("titleField").value;
        const subjectInput = document.getElementById("subjectField").value;
        const languageInput = document.getElementById("languageField").value;

        bookData.push(new NewBook(authorInput, titleInput, subjectInput, languageInput));
        new Bookshelf(bookData).render();

        document.getElementById("authorField").value = "";
        document.getElementById("titleField").value = "";
        document.getElementById("subjectField").value = "";
        document.getElementById("languageField").value ="";
    }
}

//Class that creates the Array of Books to be visualized
class Bookshelf
{
    //Constructor to take in the array of all books and store them in a new updatedable array
    constructor(bookData)
    {
        this.books = bookData;
        this.rendered = [];
    }

    //Method that renders the books and newly added books onto the Web Page
    render()
    {
        this.rendered = [];
        this.rendered = this.books.map((x)=>
            new Book(x).init()
        )

        const submitButton = document.getElementById("bookSubmit");
        submitButton.addEventListener("click", function()
        {   
            new NewBook().addBooks();
        })
    }
}

//Call to initialize the Web Page
new Bookshelf(bookData).render();
