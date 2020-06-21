using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GYM.COMMON.Model.DTO
{
    [Table("PeriodTB")]
    public class PeriodTB
    {
        [Key]
        public int PeriodID { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
