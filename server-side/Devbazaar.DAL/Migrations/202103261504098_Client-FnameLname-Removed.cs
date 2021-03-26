namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ClientFnameLnameRemoved : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Clients", "FirstName");
            DropColumn("dbo.Clients", "LastName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Clients", "LastName", c => c.String(nullable: false));
            AddColumn("dbo.Clients", "FirstName", c => c.String(nullable: false));
        }
    }
}
