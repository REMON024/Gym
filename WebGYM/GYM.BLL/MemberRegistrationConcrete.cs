using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using GYM.DAL;
using System.Linq.Dynamic.Core;
using GYM.COMMON.Library;

namespace GYM.BLL
{
    public class MemberRegistrationConcrete : IMemberRegistration
    {
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _context;


        public MemberRegistrationConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

        }

        public bool CheckNameExits(string memberFName, string memberLName, string memberMName)
        {
            var result = (from member in _context.MemberRegistration
                          where member.MemberLName == memberLName && member.MemberFName == memberFName &&
                                member.MemberMName == memberMName
                          select member.MemberId
                ).Count();

            return result > 0 ? true : false;
        }

        public long CheckNameExitsforUpdate(string memberFName, string memberLName, string memberMName)
        {
            var memberCount = (from member in _context.MemberRegistration
                               where member.MemberLName == memberLName && member.MemberFName == memberFName &&
                                     member.MemberMName == memberMName
                               select member.MemberId
                ).Count();

            if (memberCount > 0)
            {
                var result = (from member in _context.MemberRegistration
                              where member.MemberLName == memberLName && member.MemberFName == memberFName &&
                                    member.MemberMName == memberMName
                              select member.MemberId
                    ).FirstOrDefault();

                return result;
            }
            else
            {
                return 0;
            }
        }

        public bool DeleteMember(long memberId)
        {

            _context.MemberRegistration.Remove(_context.MemberRegistration.Where(p => p.MemberId == memberId).FirstOrDefault() ?? null);
           var res= _context.SaveChanges();

            if (res > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

            //using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
            //{
            //    string val = string.Empty;
            //    var para = new DynamicParameters();
            //    para.Add("@MemberId", memberId);
            //    int result = con.Execute("sprocMemberRegistrationDeleteSingleItem", para, null, 0, CommandType.StoredProcedure);
            //    if (result > 0)
            //    {
            //        return true;
            //    }
            //    else
            //    {
            //        return false;
            //    }
            //}
        }

        public GYM.COMMON.Model.ViewModel.MemberRegistrationViewModel GetMemberbyId(int memberId)
        {

            return _context.MemberRegistration.Where(p => p.MemberId == memberId).Select(c => new GYM.COMMON.Model.ViewModel.MemberRegistrationViewModel()
            {
                Address = c.Address,
                Age = c.Age,
                Amount = c.Amount,
                Contactno = c.Contactno,
                Dob = c.Dob,
                EmailId = c.EmailId,
                //Gender=c.Gender,
                JoiningDate = c.JoiningDate,
                MemberFName = c.MemberFName,
                MemberId = c.MemberId,
                MemberLName = c.MemberLName,
                MemberMName = c.MemberMName,
                PlanID = c.PlanID,
                PlanName = _context.PlanMaster.Where(p => p.PlanID == c.PlanID).FirstOrDefault().PlanName ?? "",
                SchemeID = c.SchemeID,
                SchemeName = _context.SchemeMaster.Where(p => p.SchemeID == c.SchemeID).FirstOrDefault().SchemeName ?? "",



            }).FirstOrDefault();



            //using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
            //{
            //    var para = new DynamicParameters();
            //    para.Add("@MemberId", memberId);
            //    return con.Query<GYM.COMMON.Model.ViewModel.MemberRegistrationViewModel>("sprocMemberRegistrationSelectSingleItem", para, null, true, 0, commandType: CommandType.StoredProcedure).Single();
            //}
        }


        public List<GYM.COMMON.Model.ViewModel.MemberRegistrationGridModel> GetMemberList()
        {


            return _context.MemberRegistration.Select(p => new GYM.COMMON.Model.ViewModel.MemberRegistrationGridModel()
            {
                Amount = p.Amount,
                Contactno = p.Contactno,
                Dob = p.Dob,
                EmailId = p.EmailId,
                JoiningDate = p.JoiningDate,
                MemberId = p.MemberId,
                MemberName = p.MemberFName + " " + p.MemberMName + " " + p.MemberLName,
                MemberNo = p.MemberNo,
                PlanName = _context.PlanMaster.Where(c => c.PlanID == p.PlanID).FirstOrDefault().PlanName ?? "",
                SchemeName = _context.SchemeMaster.Where(c => c.SchemeID == p.SchemeID).FirstOrDefault().SchemeName ?? ""
            }).ToList();

            //using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
            //{
            //    return con.Query<GYM.COMMON.Model.ViewModel.MemberRegistrationGridModel>("sprocMemberRegistrationSelectList", null, null, true, 0, commandType: CommandType.StoredProcedure).ToList();
            //}
        }



        public int InsertMember(GYM.COMMON.Model.DTO.MemberRegistration memberRegistration)
        {
            _context.Database.BeginTransaction();
            GYM.COMMON.Model.DTO.MemberRegistration objmemberRegistration = new GYM.COMMON.Model.DTO.MemberRegistration();
            objmemberRegistration = _context.MemberRegistration.Add(memberRegistration).Entity;
            _context.SaveChanges();

            if (objmemberRegistration != null)
            {
                int time = Convert.ToInt32(_context.PeriodTb.Where(p => p.PeriodID == (_context.PlanMaster.Where(c=>c.PlanID==objmemberRegistration.PlanID).FirstOrDefault().PeriodID)).FirstOrDefault().Value.ToString());
                GYM.COMMON.Model.DTO.PaymentDetails paymentDetails = new GYM.COMMON.Model.DTO.PaymentDetails()
                {
                    PaymentAmount=_context.PlanMaster.Where(p=>p.PlanID==objmemberRegistration.PlanID).FirstOrDefault().PlanAmount,
                    CreateDate=objmemberRegistration.JoiningDate,
                    Createdby=Convert.ToInt32(memberRegistration.Createdby),
                    MemberID=objmemberRegistration.MemberId,
                    Paymenttype="Cash",
                    RecStatus="A",
                    WorkouttypeID=Convert.ToInt32(objmemberRegistration.Createdby)
                   

                };
                DateTime next= objmemberRegistration.JoiningDate.Value.AddMonths(time).AddDays(1);
                paymentDetails.NextRenwalDate = next;
                DateTime payto= objmemberRegistration.JoiningDate.Value.AddMonths(time);
                paymentDetails.PaymentTodt = payto;

                _context.PaymentDetails.Add(paymentDetails);
                _context.SaveChanges();
                if (paymentDetails.PaymentID > 0)
                {
                    _context.Database.CommitTransaction();
                    return Convert.ToInt32(objmemberRegistration.MemberId);
                }


            }

            return 0;
        }

        public int UpdateMember(GYM.COMMON.Model.DTO.MemberRegistration memberRegistration)
        {
            int result = 0;
            _context.MemberRegistration.Update(memberRegistration);
            result = _context.SaveChanges();
            return result;
        }

        public IQueryable<GYM.COMMON.Model.ViewModel.MemberRegistrationGridModel> GetAll(GYM.COMMON.Library.QueryParameters queryParameters , int userId)
        {
            IQueryable<GYM.COMMON.Model.ViewModel.MemberRegistrationGridModel> allItems = (from member in _context.MemberRegistration
                                                                where member.Createdby == userId
                                                                join plan in _context.PlanMaster on member.PlanID equals plan.PlanID
                                                                join scheme in _context.SchemeMaster on member.SchemeID equals scheme.SchemeID
                                                                select new GYM.COMMON.Model.ViewModel.MemberRegistrationGridModel()
                                                                {

                                                                    MemberName = member.MemberFName + '|' + member.MemberMName + '|' + member.MemberLName,
                                                                    MemberNo = member.MemberNo,
                                                                    JoiningDate = member.JoiningDate,
                                                                    SchemeName = scheme.SchemeName,
                                                                    PlanName = plan.PlanName,
                                                                    MemberId = member.MemberId,
                                                                    Contactno = member.Contactno,
                                                                    EmailId = member.EmailId

                                                                }).AsQueryable().OrderBy("MemberId",
                    queryParameters.IsDescending());



            if (queryParameters.HasQuery())
            {
                allItems = allItems
                    .Where(x => x.MemberName.ToLowerInvariant().Contains(queryParameters.Query.ToLowerInvariant()));
            }

            return allItems
                .Skip(queryParameters.PageCount * (queryParameters.Page - 1))
                .Take(queryParameters.PageCount);
        }


        public int Count(int userId)
        {
            var membercount = (from payment in _context.MemberRegistration
                            where payment.Createdby == userId
                select payment).Count();
            return membercount;
        }

        public List<GYM.COMMON.Model.ViewModel.MemberResponse> GetMemberNoList(string membername, int userId)
        {
            var membernoList = (from member in _context.MemberRegistration
                                where member.MemberFName.Contains(membername) && member.Createdby == userId
                                select new GYM.COMMON.Model.ViewModel.MemberResponse
                                {
                                    MemberNo = member.MemberNo,
                                    MemberName = member.MemberFName + ' ' + member.MemberMName + ' ' + member.MemberLName
                                }).ToList();

            return membernoList;
        }




    }

    public interface IMemberRegistration
    {
        int InsertMember(GYM.COMMON.Model.DTO.MemberRegistration memberRegistration);
        long CheckNameExitsforUpdate(string memberFName, string memberLName, string memberMName);
        bool CheckNameExits(string memberFName, string memberLName, string memberMName);
        List<GYM.COMMON.Model.ViewModel.MemberRegistrationGridModel> GetMemberList();
        GYM.COMMON.Model.ViewModel.MemberRegistrationViewModel GetMemberbyId(int memberId);
        bool DeleteMember(long memberId);
        int UpdateMember(GYM.COMMON.Model.DTO.MemberRegistration memberRegistration);
        IQueryable<GYM.COMMON.Model.ViewModel.MemberRegistrationGridModel> GetAll(GYM.COMMON.Library.QueryParameters queryParameters, int userId);
        int Count(int userId);
        List<GYM.COMMON.Model.ViewModel.MemberResponse> GetMemberNoList(string memberNo, int userId);
    }
}
