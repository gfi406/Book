using System;
using System.Xml.Linq;

namespace Books.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int YearPublished { get; set; }
        public string Genre { get; set; }
        public string ContentXml { get; set; } = string.Empty;

        
    }
}
