using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GYM.COMMON.Model.ViewModel
{
    public class LoginResponse
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public bool Status { get; set; }
        public int RoleId { get; set; }
    }
}
