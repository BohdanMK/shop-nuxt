import type { NextFunction, Request, Response } from 'express';
import { companyInfoService } from '../services/companyInfo.service';

export const getCompanyInfo = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const companyInfo = await companyInfoService.getCompanyInfo();
    res.status(200).json(companyInfo);
  } catch (err) {
    next(err);
  }
};

export const createCompanyInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const companyInfo = await companyInfoService.createCompanyInfo({
      aboutDescription: req.body?.aboutDescription,
      bannerContents: req.body?.bannerContents,
      companyLogo: req.body?.companyLogo,
      companyTitle: req.body?.companyTitle,
    });

    res.status(201).json(companyInfo);
  } catch (err) {
    next(err);
  }
};

export const updateCompanyInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedCompanyInfo = await companyInfoService.updateCompanyInfo({
      aboutDescription: req.body?.aboutDescription,
      bannerContents: req.body?.bannerContents,
      companyLogo: req.body?.companyLogo,
      companyTitle: req.body?.companyTitle,
    });

    res.status(200).json(updatedCompanyInfo);
  } catch (err) {
    next(err);
  }
};
