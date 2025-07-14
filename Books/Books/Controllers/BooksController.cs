using Books.Models;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace Books.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookRepository _repo;

        public BooksController(BookRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            var books = _repo.GetBooks();
            return Ok(books);
        }
        

        [HttpPost]
        public IActionResult Create([FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!string.IsNullOrWhiteSpace(book.ContentXml))
            {
                book.ContentXml = $"<contents><![CDATA[{book.ContentXml}]]></contents>";
            }

            _repo.InsertBook(book);
            return CreatedAtAction(nameof(_repo.GetBooks), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            book.Id = id;

            if (!string.IsNullOrWhiteSpace(book.ContentXml))
            {
                book.ContentXml = $"<contents><![CDATA[{book.ContentXml}]]></contents>";
            }

            _repo.UpdateBook(book);
            return Ok(book);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repo.DeleteBook(id);
            return NoContent();
        }

       
    }
}