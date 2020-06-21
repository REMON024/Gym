using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using GYM.DAL;
using GYM.COMMON.Model.DTO;
using GYM.COMMON.Model.ViewModel;

namespace GYM.BLL
{
    public class PlanMasterConcrete : IPlanMaster
    {
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _context;
        public PlanMasterConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

        }

        public void InsertPlan(PlanMaster plan)
        {
            var res = _context.PlanMaster.Add(plan);
            _context.SaveChanges();
            //using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
            //{
            //    var paramater = new DynamicParameters();
            //    paramater.Add("@PlanID", plan.PlanID);
            //    paramater.Add("@SchemeID", plan.SchemeID);
            //    paramater.Add("@PeriodID", plan.PeriodID);
            //    paramater.Add("@PlanName", plan.PlanName);
            //    paramater.Add("@PlanAmount", plan.PlanAmount);
            //    paramater.Add("@ServiceTax", plan.ServiceTax);
            //    paramater.Add("@CreateUserID", plan.CreateUserID);
            //    paramater.Add("@ModifyUserID", plan.ModifyUserID);
            //    paramater.Add("@RecStatus", plan.RecStatus);
            //    var value = con.Query<int>("sprocPlanMasterInsertUpdateSingleItem", paramater, null, true, 0, commandType: CommandType.StoredProcedure);
            //}
        }

        public bool CheckPlanExits(string planName)
        {
            var result = (from plan in _context.PlanMaster
                          where plan.PlanName == planName
                          select plan).Count();

            return result > 0 ? true : false;
        }

        public List<PlanMasterDisplayViewModel> GetPlanMasterList()
        {
            var result = (from plan in _context.PlanMaster
                          join scheme in _context.SchemeMaster on plan.SchemeID equals scheme.SchemeID
                          join period in _context.PeriodTb on plan.PeriodID equals period.PeriodID
                          select new PlanMasterDisplayViewModel
                          {
                              SchemeName = scheme.SchemeName,
                              PlanAmount = plan.PlanAmount,
                              PeriodID = plan.PeriodID,
                              PlanName = plan.PlanName,
                              PlanID = plan.PlanID,
                              RecStatus = plan.RecStatus,
                              ServicetaxNo = plan.ServicetaxNo,
                              Text = period.Text,
                              SchemeID = scheme.SchemeID,
                              ServiceTax = plan.ServiceTax,
                              ServicetaxAmount = plan.ServicetaxAmount,
                              TotalAmount = plan.TotalAmount
                          }).ToList();

            return result;
        }

        public List<ActivePlanModel> GetActivePlanMasterList(int? schemeId)
        {
            var result = (from plan in _context.PlanMaster
                          where plan.RecStatus == true && plan.SchemeID == schemeId
                          select new ActivePlanModel
                          {
                              PlanName = plan.PlanName,
                              PlanID = plan.PlanID.ToString()
                          }).ToList();

            return result;
        }

        public bool UpdatePlanMaster(PlanMaster planMaster)
        {
            _context.Entry(planMaster).Property(x => x.RecStatus).IsModified = true;
            _context.Entry(planMaster).Property(x => x.PlanAmount).IsModified = true;
            _context.Entry(planMaster).Property(x => x.ServiceTax).IsModified = true;
            var result = _context.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool DeletePlan(int planId)
        {
            var planmaster = (from plan in _context.PlanMaster
                              where plan.PlanID == planId
                              select plan).FirstOrDefault();
            if (planmaster != null)
            {
                _context.PlanMaster.Remove(planmaster);
                var result = _context.SaveChanges();

                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public PlanMasterViewModel GetPlanMasterbyId(int planId)
        {
            var result = (from plan in _context.PlanMaster
                          where plan.PlanID == planId
                          select new PlanMasterViewModel
                          {
                              PlanID = plan.PlanID,
                              PeriodID = plan.PeriodID,
                              RecStatus = plan.RecStatus,
                              SchemeID = plan.SchemeID,
                              ServiceTax = plan.ServiceTax,
                              PlanName = plan.PlanName,
                              PlanAmount = plan.PlanAmount,
                              ServicetaxNo = plan.ServicetaxNo,
                              ServicetaxAmount = plan.ServicetaxAmount,
                              TotalAmount = plan.TotalAmount
                          }).FirstOrDefault();

            return result;
        }
        public string GetAmount(int planId, int schemeId)
        {
          return  _context.PlanMaster.Where(p => p.PlanID == planId && p.SchemeID == schemeId).FirstOrDefault().TotalAmount.ToString();
        }

        public int GetPlanMonthbyPlanId(int? planId)
        {
            var result = (from plan in _context.PlanMaster
                          where plan.PlanID == planId
                          select plan.PeriodID).FirstOrDefault();
            return result;
        }
    }

    public interface IPlanMaster
    {
        void InsertPlan(PlanMaster plan);
        bool CheckPlanExits(string planName);
        List<PlanMasterDisplayViewModel> GetPlanMasterList();
        PlanMasterViewModel GetPlanMasterbyId(int planId);
        bool DeletePlan(int planId);
        bool UpdatePlanMaster(PlanMaster planMaster);
        List<ActivePlanModel> GetActivePlanMasterList(int? schemeId);
        string GetAmount(int planId, int schemeId);
        int GetPlanMonthbyPlanId(int? planId);
    }
}
