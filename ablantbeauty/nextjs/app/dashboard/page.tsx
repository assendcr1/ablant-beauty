import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getCustomerOrders } from '@/lib/woocommerce';
import Link from 'next/link';
import { ShoppingBag, User, Package, Heart, LogOut } from 'lucide-react';

export const metadata = { title: 'My Dashboard' };

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  processing: 'bg-blue-50 text-blue-700 border-blue-100',
  'on-hold': 'bg-gray-100 text-gray-600 border-gray-200',
  completed: 'bg-green-50 text-green-700 border-green-100',
  cancelled: 'bg-red-50 text-red-600 border-red-100',
  refunded: 'bg-gray-50 text-gray-500 border-gray-100',
  failed: 'bg-red-50 text-red-600 border-red-100',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const user = session.user as any;
  let orders: any[] = [];

  try {
    if (user.customerId) {
      orders = await getCustomerOrders(user.customerId);
    }
  } catch {
    // WooCommerce not configured yet
  }

  const totalSpent = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum: number, o: any) => sum + parseFloat(o.total), 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-1">
            Welcome back, {user.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-black transition-colors"
        >
          <LogOut size={15} /> Sign Out
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: ShoppingBag, label: 'Total Orders', value: orders.length },
          {
            icon: Package,
            label: 'Processing',
            value: orders.filter((o) => o.status === 'processing').length,
          },
          {
            icon: Package,
            label: 'Completed',
            value: orders.filter((o) => o.status === 'completed').length,
          },
          {
            icon: Heart,
            label: 'Total Spent',
            value: `R${totalSpent.toLocaleString()}`,
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#f7f6f4] rounded-lg p-5">
            <stat.icon size={18} className="mb-3 text-gray-400" />
            <p className="font-serif text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Nav tabs */}
      <div className="flex gap-6 border-b border-gray-100 mb-8">
        {[
          { href: '/dashboard', label: 'Orders', icon: ShoppingBag },
          { href: '/dashboard/account', label: 'Account', icon: User },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex items-center gap-1.5 pb-3 text-sm font-semibold border-b-2 border-black"
          >
            <tab.icon size={15} /> {tab.label}
          </Link>
        ))}
      </div>

      {/* Orders table */}
      <div>
        <h2 className="font-serif text-xl font-bold mb-5">Recent Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
            <ShoppingBag size={32} className="mx-auto mb-3 text-gray-200" />
            <p className="font-serif text-lg text-gray-400">No orders yet</p>
            <p className="text-sm text-gray-400 mb-5">Start shopping Vanessa&apos;s wig collection</p>
            <Link href="/shop" className="btn-primary inline-flex">
              Browse Wigs
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-widest text-gray-400">
                  <th className="py-3 text-left font-semibold">Order</th>
                  <th className="py-3 text-left font-semibold">Date</th>
                  <th className="py-3 text-left font-semibold">Status</th>
                  <th className="py-3 text-left font-semibold">Items</th>
                  <th className="py-3 text-right font-semibold">Total</th>
                  <th className="py-3 text-right font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-semibold">#{order.number}</td>
                    <td className="py-4 text-gray-500">
                      {new Date(order.date_created).toLocaleDateString('en-ZA', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${
                          STATUS_STYLES[order.status] || 'bg-gray-50 text-gray-500 border-gray-100'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500">{order.line_items?.length ?? 0} item(s)</td>
                    <td className="py-4 text-right font-serif font-bold">
                      R{parseFloat(order.total).toLocaleString()}
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="text-xs font-semibold underline hover:no-underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
