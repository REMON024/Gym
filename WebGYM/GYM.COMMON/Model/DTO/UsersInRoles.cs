using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GYM.COMMON.Model.DTO
{
    [Table("UsersInRoles")]
    public class UsersInRoles
    {
        [Key]
        public int UserRolesId { get; set; }
        public int RoleId { get; set; }
        public int UserId { get; set; }
    }
}
