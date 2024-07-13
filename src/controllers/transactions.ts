import { Request, Response} from 'express';
import axios from 'axios'
import Transactions from '../models/Transactions';
import { generateCode } from '../utils/generateCode';
import { CustomRequest } from '../utils/customRequest';


export const buyData = async (req: CustomRequest, res: Response) => {
   try {
      const {phone} = req.body;
      const apiKey = process.env.API_KEY as string
      const extraReference = generateCode()
      
      const payload = {
         phone,
         dataType: "SME",
         planId: "1",
         network: "1",
         reference: `2024071302${extraReference}`
      }
      const response = await axios.post('https://b2b.eazymobile.ng/api/live/v1/topup/data', payload, {
         headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
         }
      })

    
      const newTransaction = new Transactions({
         userId: req.user!.id,
         network: payload.network,
         planId: payload.planId,
         phone,
         reference: payload.reference,
      })

      newTransaction.save();

      res.status(201).json({
         message: 'Operation successful',
         newTransaction,
         eazyMoneyResponse: response.data
      })


   } catch (error) {
      throw error;
   }
}


export const getAllTransactions = async (req: Request, res:Response) => {
   try {
    const transactions = await Transactions.find();
    
    res.status(200).json({
      message: 'Transaction data fetched successfully',
      transactions,
    })
   } catch (error) {
      throw error;
   }
}

export const deleteTransactions = async (req: Request, res: Response) => {
   try{
      const transactionId = req.params.id;

      const transaction = await Transactions.findByIdAndDelete( transactionId);
      if (!transaction) {
         res.status(404).json({
            message: 'Transaction not found',
         })

         return;
      }

      res.status(200).json({
         message: 'Operation Successful',
         transaction,
      })
   }catch(error) {
      throw error
   }
}