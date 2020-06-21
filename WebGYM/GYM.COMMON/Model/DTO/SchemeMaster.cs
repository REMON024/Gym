using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GYM.COMMON.Model.DTO
{
    public class SchemeMaster
    {
        [Key]
        public int SchemeID { get; set; }
        public string SchemeName { get; set; }
        public int Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public bool Status { get; set; }
    }
}
