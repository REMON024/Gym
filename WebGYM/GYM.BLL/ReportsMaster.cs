using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using GYM.DAL;
using GYM.COMMON.Model.ViewModel;
using GYM.COMMON.Model.DTO;


namespace GYM.BLL
{
    public class ReportsMaster : IReports
    {
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _context;
        public ReportsMaster(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public List<MemberDetailsReportViewModel> Generate_AllMemberDetailsReport()
        {
            List<MemberDetailsReportViewModel> memberDetailsReportViewModels = new List<MemberDetailsReportViewModel>();
            memberDetailsReportViewModels = _context.MemberRegistration.Select(c => new MemberDetailsReportViewModel() {
            Address=c.Address,
            PaymentAmount=Convert.ToInt32(_context.PaymentDetails.Where(p=>p.MemberID==c.MemberId).FirstOrDefault().PaymentAmount),
            Contactno=c.Contactno,
            EmailID=c.EmailId,
            JoiningDate=c.JoiningDate.ToString(),
            MemberNo=c.MemberNo,
            Name=c.MemberLName,
            PlanName=_context.PlanMaster.Where(p=>p.PlanID==c.PlanID).FirstOrDefault().PlanName,
            RenwalDate=_context.PaymentDetails.Where(p=>p.MemberID==c.MemberId).FirstOrDefault().NextRenwalDate.ToString(),
            SchemeName=_context.SchemeMaster.Where(p=>p.SchemeID==c.SchemeID).FirstOrDefault().SchemeName
            
            
            }).ToList();
            return memberDetailsReportViewModels;
        }

        //public List<YearwiseReportViewModel> Get_YearwisePayment_details(string year)
        //{
        //    //List<YearwiseReportViewModel> lstYearwiseReportViewModel = new List<YearwiseReportViewModel>();
        //    //lstYearwiseReportViewModel=_context.PaymentDetails.Where(p=>p.CreateDate.Value.Year.ToString()== year).Select(c=> new YearwiseReportViewModel() { 
        //    //CurrentYear= c.CreateDate.Value.Year,
        //    //Jan=(int)_context.PaymentDetails.Count(p=>p.CreateDate.Value.Month==1),



        //    //})

        //    using (var con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
        //    {
        //        var para = new DynamicParameters();
        //        para.Add("@year", year);

        //        return con.Query<YearwiseReportViewModel>("Usp_GetYearwisepaymentdetails", para, null, true, 0, commandType: CommandType.StoredProcedure).ToList();
        //    }
        //}

        //public List<MonthWiseReportViewModel> Get_MonthwisePayment_details(string monthId)
        //{
        //    using (var con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
        //    {
        //        var para = new DynamicParameters();
        //        para.Add("@month", monthId);
        //        return con.Query<MonthWiseReportViewModel>("Usp_GetMonthwisepaymentdetails", para, null, true, 0, commandType: CommandType.StoredProcedure).ToList();
        //    }
        //}


        //public List<RenewalReportViewModel> Get_RenewalReport(RenewalReportRequestModel renewalReport)
        //{
        //    using (var con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
        //    {
        //        var para = new DynamicParameters();
        //        para.Add("@Paymentfromdt", renewalReport.Paymentfromdate);
        //        para.Add("@Paymenttodt", renewalReport.Paymentfromto);
        //        return con.Query<RenewalReportViewModel>("Usp_GetAllRenwalrecordsFromBetweenDate", para, null, true, 0, commandType: CommandType.StoredProcedure).ToList();
        //    }
        //}

    }

    public interface IReports
    {
        List<MemberDetailsReportViewModel> Generate_AllMemberDetailsReport();
        //List<YearwiseReportViewModel> Get_YearwisePayment_details(string year);
        //List<MonthWiseReportViewModel> Get_MonthwisePayment_details(string monthId);
        //List<RenewalReportViewModel> Get_RenewalReport(RenewalReportRequestModel renewalReport);
    }
}
