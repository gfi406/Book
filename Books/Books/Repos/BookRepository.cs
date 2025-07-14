using Microsoft.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using Books.Models;

public class BookRepository
{
    private readonly string _connectionString;

    public BookRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public void InsertBook(Book book)
    {
        using var conn = new SqlConnection(_connectionString);
        using var cmd = new SqlCommand("InsertBook", conn)
        {
            CommandType = CommandType.StoredProcedure
        };

        cmd.Parameters.Add("@Title", SqlDbType.NVarChar, 200).Value = book.Title;
        cmd.Parameters.Add("@Author", SqlDbType.NVarChar, 200).Value = book.Author;
        cmd.Parameters.Add("@YearPublished", SqlDbType.Int).Value = book.YearPublished;
        cmd.Parameters.Add("@Genre", SqlDbType.NVarChar, 100).Value = book.Genre;
        cmd.Parameters.Add("@Contents", SqlDbType.Xml).Value = book.ContentXml ?? (object)DBNull.Value;

        conn.Open();
        cmd.ExecuteNonQuery();
    }

    public void UpdateBook(Book book)
    {
        using var conn = new SqlConnection(_connectionString);
        using var cmd = new SqlCommand("UpdateBook", conn)
        {
            CommandType = CommandType.StoredProcedure
        };

        cmd.Parameters.Add("@Id", SqlDbType.Int).Value = book.Id;
        cmd.Parameters.Add("@Title", SqlDbType.NVarChar, 200).Value = book.Title;
        cmd.Parameters.Add("@Author", SqlDbType.NVarChar, 200).Value = book.Author;
        cmd.Parameters.Add("@YearPublished", SqlDbType.Int).Value = book.YearPublished;
        cmd.Parameters.Add("@Genre", SqlDbType.NVarChar, 100).Value = book.Genre;
        cmd.Parameters.Add("@Contents", SqlDbType.Xml).Value = book.ContentXml ?? (object)DBNull.Value;

        conn.Open();
        cmd.ExecuteNonQuery();
    }

    public void DeleteBook(int id)
    {
        using var conn = new SqlConnection(_connectionString);
        using var cmd = new SqlCommand("DeleteBook", conn)
        {
            CommandType = CommandType.StoredProcedure
        };

        cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;

        conn.Open();
        cmd.ExecuteNonQuery();
    }

    public List<Book> GetBooks()
    {
        var books = new List<Book>();

        using var conn = new SqlConnection(_connectionString);
        using var cmd = new SqlCommand("SelectBooks", conn)
        {
            CommandType = CommandType.StoredProcedure
        };

        conn.Open();
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            books.Add(new Book
            {
                Id = reader.GetInt32(0),
                Title = reader.GetString(1),
                Author = reader.GetString(2),
                YearPublished = reader.GetInt32(3),
                Genre = reader.GetString(4),
                ContentXml = reader.IsDBNull(5) ? null : reader.GetSqlXml(5).Value
            });
        }

        return books;
    }
}
