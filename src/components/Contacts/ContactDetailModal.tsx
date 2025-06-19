import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { SearchableSelect } from '../form/SearchableSelect';
import { fetchAccounts, fetchAccountById } from '../../api/accounts';

interface ContactData {
  id: string;
  name: string;
  accountId: string;
}

interface ContactDetailModalProps {
  contact?: ContactData;
  onClose: () => void;
  onSave: (data: ContactData) => void;
  onDelete?: () => void;
}

const ContactDetailModal: React.FC<ContactDetailModalProps> = ({
  contact,
  onClose,
  onSave,
  onDelete,
}) => {
  const [id, setId] = useState<string>(contact?.id || '');
  const [name, setName] = useState<string>(contact?.name || '');
  const [accountId, setAccountId] = useState<string>(contact?.accountId || '');

  // Dropdown states
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<{ id: string; label: string } | undefined>(undefined);
  const [dropdownOptions, setDropdownOptions] = useState<{ id: string; label: string }[]>([]);

  // Keep selectedAccount in sync with accountId
  useEffect(() => {
    let isMounted = true;
    async function syncSelectedAccount() {
      if (!accountId) {
        if (isMounted) setSelectedAccount(undefined);
        return;
      }
      setDropdownLoading(true);
      try {
        const acc = await fetchAccountById(accountId);
        if (acc && isMounted) {
          const option = { id: acc.id, label: acc.name };
          setSelectedAccount(option);
          setDropdownOptions((opts) => {
            if (!opts.find(o => o.id === option.id)) {
              return [option, ...opts];
            }
            return opts;
          });
        }
      } catch {
        if (isMounted) setSelectedAccount(undefined);
      } finally {
        if (isMounted) setDropdownLoading(false);
      }
    }
    syncSelectedAccount();
    return () => { isMounted = false; };
  }, [accountId]);

  const handleAccountSearch = async (query: string) => {
    setDropdownLoading(true);
    try {
      const res = await fetchAccounts(1, 5, query, 'name', 'asc');
      let opts = res.data.map(a => ({ id: a.id, label: a.name }));
      // Always include selectedAccount if not present
      if (selectedAccount && !opts.find(o => o.id === selectedAccount.id)) {
        opts = [selectedAccount, ...opts];
      }
      setDropdownOptions(opts);
      return opts;
    } finally {
      setDropdownLoading(false);
    }
  };

  // On mount, load initial options (for edit mode)
  useEffect(() => {
    handleAccountSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setId(contact?.id || '');
    setName(contact?.name || '');
    setAccountId(contact?.accountId || '');
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !accountId) return;
    const data: ContactData = {
      id: id || crypto.randomUUID(),
      name: name.trim(),
      accountId: accountId,
    };
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {contact ? 'Edit Contact' : 'New Contact'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
            <SearchableSelect
              value={selectedAccount}
              onSelect={opt => setAccountId(opt.id)}
              onSearch={handleAccountSearch}
              options={dropdownOptions}
              loading={dropdownLoading}
              placeholder="Select account"
            />
          </div>

          <div className="flex justify-end space-x-2">
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetailModal;