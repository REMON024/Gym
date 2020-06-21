using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GYM.DAL
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            Database.EnsureCreated();

        }

        public DbSet<COMMON.Model.DTO.SchemeMaster> SchemeMaster { get; set; }
        public DbSet<COMMON.Model.DTO.PeriodTB> PeriodTb { get; set; }
        public DbSet<COMMON.Model.DTO.PlanMaster> PlanMaster { get; set; }
        public DbSet<COMMON.Model.DTO.Role> Role { get; set; }
        public DbSet<COMMON.Model.DTO.MemberRegistration> MemberRegistration { get; set; }
        public DbSet<COMMON.Model.DTO.Users> Users { get; set; }
        public DbSet<COMMON.Model.DTO.UsersInRoles> UsersInRoles { get; set; }
        public DbSet<COMMON.Model.DTO.PaymentDetails> PaymentDetails { get; set; }
    }
    
}
