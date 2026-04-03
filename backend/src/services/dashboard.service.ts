import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';
import { OrderModel } from '../models/Order';

export async function getDashboardInfo() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [totalProducts, totalCategories, totalOrders, monthOrders, dailyOrdersRaw] =
        await Promise.all([
            ProductModel.countDocuments(),
            CategoryModel.countDocuments(),
            OrderModel.countDocuments(),
            OrderModel.countDocuments({
                createdAt: { $gte: startOfMonth, $lt: startOfNextMonth },
            }),
            OrderModel.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startOfMonth, $lt: startOfNextMonth },
                    },
                },
                {
                    $group: {
                        _id: { $dayOfMonth: '$createdAt' },
                        count: { $sum: 1 },
                        revenue: { $sum: '$cartSnapshot.totalPrice' },
                    },
                },
                { $sort: { _id: 1 } },
            ]),
        ]);

    // Fill all days of the current month with 0 if no orders
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const dailyMap = new Map<number, { count: number; revenue: number }>(
        dailyOrdersRaw.map((d) => [d._id as number, { count: d.count, revenue: d.revenue ?? 0 }])
    );

    const ordersPerDay = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const data = dailyMap.get(day) ?? { count: 0, revenue: 0 };
        return { day, ...data };
    });

    return {
        totalProducts,
        totalCategories,
        totalOrders,
        monthOrders,
        ordersPerDay,
    };
}
